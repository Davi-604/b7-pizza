"use client"

import { CustomInput } from "@/components/layout/CustomInput";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useAuth } from "@/stores/auth";
import { useState } from "react";
import z from 'zod';

const schema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(2, 'Campo obrigatório'),
});

type Props = {
    email: string;
}

export const StepSinginArea = ({ email }: Props) => {
    const auth = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>();
    
    const [email_field, setEmailField] = useState(email);
    const [password_field, setPasswordField] = useState('');

    const handleSubmmitButton = async () => {
        setErrors(null);

        const validated_data = schema.safeParse({
            email: email_field,
            password: password_field,
        })

        if (!validated_data.success) {
            setErrors(validated_data.error.flatten().fieldErrors)

            return false;
        }

        try {
            setLoading(true);

            const req = await api.post('/auth/singin', {
                email: validated_data.data.email,
                password: validated_data.data.password,
            })

            if (!req.data.token) {
                alert(req.data.error)
            } else {
                auth.setToken(req.data.token);
                auth.setOpen(false);
            }

            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <p className="mb-2">
                    Digite o seu e-mail
                </p>
                <CustomInput 
                    name="email"
                    errors={errors}
                    disabled={loading}
                    type="email"
                    value={email_field}
                    onChange={(e) => setEmailField(e.target.value)}
                    
                />
            </div>
            <div>
                <p className="mb-2">
                    Digite a sua senha
                </p>
                <CustomInput 
                    name="password"
                    errors={errors}
                    disabled={loading}
                    type="password"
                    value={password_field}
                    onChange={(e) => setPasswordField(e.target.value)}
                    autoFocus
                />
            </div>

            <Button
                disabled={loading}
                onClick={handleSubmmitButton}
            >
                Enviar
            </Button>
        </> 
    )
}