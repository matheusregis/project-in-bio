"use client";

import { createLink } from "@/app/actions/create-link";
import { verifyLink } from "@/app/actions/verify-link";
import Button from "@/app/components/ui/Button";
import TextInput from "@/app/components/ui/TextInput";
import { sanitizeLink } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreateLinkForm() {
    const router = useRouter();
    const [link, setLink] = useState("");
    const [error, setError] = useState("");

    function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
        setLink(sanitizeLink(e.target.value));
        setError("")
    }
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (link.length === 0) return setError("Escolha um link primeiro :)");
        
        const isLinkTaken = await verifyLink(link);

        if (isLinkTaken) return setError("Desculpe, esse link já está em uso");


        const isLinkCreated = await createLink(link);
        console.log(isLinkCreated)

        if (!isLinkCreated) return setError("Ocorreu um erro ao criar o link, tente novamente");
        
        router.push(`/${link}`);
    }
    return (
        <>
            <form className="w-full flex items-center gap-2" onSubmit={handleSubmit}>
                        <span className="text-white">projectinbio.com</span>
                        <TextInput value={link}  onChange={handleLinkChange}/>
                        <Button className="w-[126px]">Criar</Button>
                    </form>
                    <div>
                        <span className="text-accent-pink">{error}</span>
                    </div>
        </>
    )
}