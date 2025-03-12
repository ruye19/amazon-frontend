import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import Stripe from 'stripe';  
config();
const stripe = new Stripe(process.env.STRIPE_KEY); 
const app = express();


app.use(cors({ origin: true }));

app.use(json());



app.get('/', (req, res) => {
    res.status(200).json({
        message: "success",
    });
});


app.post('/payment/create',async (req,res)=> {
    const total = parseInt(req.query.total)
    if (total > 0 ) {
       const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency: 'USD'
       })
       
       res.status(201).json(
        { clientSecret:  paymentIntent.client_secret

    })
      
    }else{
        res.status(402).json({
            message: "total must be greater than zero"
        })

    }
})

export const api = onRequest(app);
