"use client"

import { CustomInput } from "@/components/layout/CustomInput";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useState } from "react";
import z from 'zod';

const schema = z.object({
    email: z.string().email('E-mail inválido')
})

type Props = {
    onValidate: (has_email: boolean, email: string) => void;
}

export const StepEmailArea = ({ onValidate }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>();

    const [email_field, setEmailField] = useState('');

    const handleContinueButton = async () => {
        setErrors(null);

        const validated_data = schema.safeParse({
            email: email_field
        })

        if (!validated_data.success) {
            setErrors(validated_data.error.flatten().fieldErrors)

            return false;
        }

        try {
            setLoading(true);
            const req = await api.post('/auth/validate_email', {
                email: validated_data.data.email
            })
            setLoading(false);

            onValidate(req.data.exists ? true : false, validated_data.data.email);
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

            <Button
                disabled={loading}
                onClick={handleContinueButton}
            >
                Continuar
            </Button>
        </>
    )
}