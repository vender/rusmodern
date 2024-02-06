"use client"
// import Button from "#/components/ui/button";
import Button from '@mui/material/Button';
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
        <div className='flex gap-x-2 items-center justify-between'>
            <h3 className='text-xs'>Нет в наличии</h3>
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Уведомить о поступлении товара"
            >
                <Button 
                    onClick={() => preorderAdd()} 
                    className="bg-slate-900 text-white px-2 md:px-2 lg:px-2 py-2 md:py-2 lg:py-2 hover:text-white hover:bg-gray-600 hover:shadow-cart"
                >
                    {editing ? <LoadingDots className="bg-black dark:bg-white" /> : <GoBell className='text-white' />}
                </Button>
            </Tooltip>
        </div>
    )
}
