// @ts-nocheck
import Stripe from 'stripe'

// Ensure you set STRIPE_SECRET_KEY in Vercel Project Settings (Environment Variables)
const stripeSecret = process.env.STRIPE_SECRET_KEY

if (!stripeSecret) {
  console.warn('[Stripe] STRIPE_SECRET_KEY is not set. API will return 500 until configured.')
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : (null as unknown as Stripe)

function getOrigin(req: any) {
  const origin = (req.headers.origin as string) || (req.headers.referer as string)
  if (origin) {
    // strip path if referer
    try {
      const u = new URL(origin)
      return `${u.protocol}//${u.host}`
    } catch (e) {
      // fall through
    }
  }
  return 'http://localhost:5173'
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured. Missing STRIPE_SECRET_KEY.' })
  }

  try {
    const { course } = req.body as { course?: { id: number; title: string; price: string } }
    if (!course) {
      return res.status(400).json({ error: 'Missing course payload' })
    }

    // Parse price like "$99" => 9900 cents
    const amount = Math.round(parseFloat(course.price.replace(/[^0-9.]/g, '')) * 100)
    if (!amount || Number.isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid course price' })
    }

    const origin = getOrigin(req)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: course.title },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?courseId=${course.id}`,
      cancel_url: `${origin}/cancel?courseId=${course.id}`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err: any) {
    console.error('[Stripe] Error creating checkout session', err)
    return res.status(500).json({ error: err?.message || 'Internal Server Error' })
  }
}
