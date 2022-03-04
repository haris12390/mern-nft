import React, { useEffect, useRef } from 'react'
import "./PayPal.css"

export default function PayPal({ amount }) {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            style: {
                layout: 'horizontal',
                size: 'small',
                color: 'blue',
                // shape: 'pill',
                label: 'pay',
                height: 40,
                tagline: 'false'
            },
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{

                        description: "NFT COLLECTIONS 1",
                        amount: {
                            currency_code: "USD",
                            value: amount
                        }

                    }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order, "Success")
            },
            onError: (err) => {
                console.log(err, "Error")
            }
        }).render(paypal.current)
    }, [])

    return (
        <div ref={paypal}>
        </div>
    )
}
