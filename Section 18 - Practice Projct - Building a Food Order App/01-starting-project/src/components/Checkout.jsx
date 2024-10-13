import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from './store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from './store/UserProgress';

export default function Checkout() {
 const cartCtx = useContext(CartContext);
 const userProgressCtx = useContext(UserProgressContext);

 const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

 function handleClose() {
    userProgressCtx.hideCheckout();
 }

 function handleSubmit(event)
 {
    event.preventDefault();
    //we could use state for getting the value
    // we could also use ref for getting the value

    //third state: use built-in FormData object

    const fd =  new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // {email: test@example.com}
    
    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           order: {
                customer: customerData,
                items: cartCtx.items
           }
        })
    });
 }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${currencyFormatter.format(cartTotal)}</p>

            <Input label='Full Name' type='text' id='name' />
            <Input label='E-mail Address' type='email' id='email' />
            <Input label='Street' type='text' id='street' />

            <div className='control-row'>
                <Input label='Postal Code' type='text' id='postal-code'/>
                <Input label='City' type='text' id='city'/>
            </div>

            <p className='modal-actions'>
                {/* type button because we don't want the submit behaviour */}
                <Button type='button' textOnly onClick={handleClose}>
                    Close
                </Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}
