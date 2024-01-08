"use client"
import Button from "#/components/ui/button";
import { GoBell } from "react-icons/go";
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import LoadingDots from '../loading-dots';
import { useState } from 'react';

export default function Preorder({isLogedIn, product}:any) {
    const [editing, setEditing] = useState(false);

    const preorderAdd = async () => {
        if(isLogedIn && product) {
            setEditing(true);

            const response = await fetch(`/api/preorder`, {
                method: 'POST',
                body: JSON.stringify({
                    product_id: product.product_id,
                    name: `${isLogedIn.firstname} ${isLogedIn.lastname}`,
                    email: isLogedIn.email
                })
            });
            const data:{status:number} = await response.json();
            if(data?.status == 204) {
                alert('Вы подписались на уведомление о поступлении товара.');
                setEditing(false);
            }
        } else {
            alert('Войдите, что бы включить уведомления!');
            
        }
    }
    
  return (
    <>
        <h4>Товара нет в наличии</h4>
        <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Уведомить о поступлении"
        >
            <Button onClick={() => preorderAdd()} className="w-1/5">{editing ? <LoadingDots className="bg-black dark:bg-white" /> : <GoBell />}</Button>
        </Tooltip>
    </>
  )
}
