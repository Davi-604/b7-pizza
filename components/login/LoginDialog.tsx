"use client"

import { useAuth } from "@/stores/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { StepEmailArea } from "./steps/StepEmailArea";
import { StepSingupArea } from "./steps/StepSingupArea";
import { getCookie } from "cookies-next/client";
import { StepSinginArea } from "./steps/StepSinginArea";

type Steps = "EMAIL" | "SINGUP" | "SINGIN";

export const LoginDialog = () => {
    const auth = useAuth();

    const [step, setStep] = useState<Steps>("EMAIL");
    const [email_field, setEmailField] = useState('');

    useEffect(() => {
        const token = getCookie('token');
        
        if (token) auth.setToken(token);
    }, [])

    const handleStepEmail = (has_email: boolean, email: string) => {
        setEmailField(email);

        if (has_email) {
            setStep('SINGIN')

            return
        }

        setStep('SINGUP');
    }

    return (
        <Dialog
            open={auth.open}
            onOpenChange={open => auth.setOpen(open)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        { step != 'EMAIL' &&
                            <Button 
                                variant='ghost'
                                size='icon'
                                onClick={() => setStep('EMAIL')}
                            >
                                <ArrowLeft className="size-4"/>
                            </Button>  
                        }

                        { step === 'EMAIL' && "Login / Cadastro" }
                        { step === 'SINGIN' && "Login" }
                        { step === 'SINGUP' && "Cadastro" }
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    { step === 'EMAIL' && <StepEmailArea onValidate={handleStepEmail}/> }
                    { step === 'SINGIN' && <StepSinginArea email={email_field} /> }
                    { step === 'SINGUP' && <StepSingupArea email={email_field} /> }
                </div>
            </DialogContent>
        </Dialog>
    )
}