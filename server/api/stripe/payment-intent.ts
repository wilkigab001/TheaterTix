import Stripe from 'stripe';
import { defineEventHandler, readBody, getQuery, createError } from 'h3'


export default defineEventHandler(async(event) => {
        const stripeSecretKey = process.env.STRIPE_SUPER_SECRET_KEY_PUBLISHABLE_LOCAL
        const method = event.node.req.method;

        if(!stripeSecretKey){
            throw createError({
                statusCode: 500,
                statusMessage: 'Stripe key not configured'
            })
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2025-08-27.basil'
        })
        
        try{
            switch(method){
                case 'POST':{
                    const body = await readBody(event);
                    const {amount, currency='usd', metadata={}}=body;

                    if(!amount || amount < .50){
                        throw createError({
                            statusCode: 500,
                            statusMessage: 'Amount must be at least $.50'
                        })
                    }

                    const PaymentIntent = await stripe.paymentIntents.create({
                        amount: Math.round(amount * 100),
                        currency,
                        metadata,
                        automatic_payment_methods:{
                            enabled: true
                        },
                    })

                    return {
                        clientSecret: PaymentIntent.client_secret,
                        paymentIntentId: PaymentIntent.id,
                        amount: PaymentIntent.amount,
                        status: PaymentIntent.status
                    }
                }
            }
        }

        catch(e: any){
            if(e.type === 'StripeCardError'){
                throw createError({
                    statusCode: 400,
                    statusMessage: e.message
                })
            }

            throw createError({
                statusCode: e.statusCode || 500,
                statusMessage: e.statusMessage || e.message || 'Payment Intent Failed'
            })
        }

})