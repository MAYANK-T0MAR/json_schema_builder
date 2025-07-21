import { SquareArrowOutUpRight } from "lucide-react";
import { FaDiscord, FaGithub, FaMedium, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className="w-full min-h-[50vh] mt-96 flex flex-col items-end px-7 gap-20">
            <div className="w-full flex gap-10 justify-center flex-wrap">
                <a href="https://x.com/MayankDotTxT" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-5">
                        <FaXTwitter /> <span>Twitter</span>
                    </div>
                </a>
                <a href="https://discord.com/users/875257441355448371" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-5">
                        <FaDiscord /> <span>Discord</span>
                    </div>
                </a>
                <a href="https://medium.com/@MayankDotTxT" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-5">
                        <FaMedium /> <span>Medium</span>
                    </div>
                </a>
                <a href="https://github.com/MAYANK-T0MAR" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-5">
                        <FaGithub /> <span>Github</span>
                    </div>
                </a>

            </div>
            <div className="w-fit lg:w-[90vw] mx-auto h-full rounded-tl-3xl rounded-tr-3xl bg-card border border-border p-10 pb-[130px] flex flex-col md:flex-row justify-between gap-20 flex-wrap">
                <div className="flex flex-col gap-2 flex-1">
                    <span className="text-2xl">Community</span>
                    <span className="font-extralight">Join <span className="italic">Barely Dev</span>, our growing dev community on Discord and collaborate, ask questions, or share ideas.</span>
                    <a href="https://discord.gg/x5PeqAhrwV" target="_blank" rel="noopener noreferrer">
                        <div className="underline underline-offset-6 flex gap-2">Join Barely Dev <SquareArrowOutUpRight /></div>
                    </a>

                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <span className="text-2xl">Support</span>
                    <span className="font-extralight">Found a bug or have a suggestion? Open an issue on the GitHub repository.</span>
                    <a href="https://github.com/MAYANK-T0MAR/json_schema_builder/issues" target="_blank" rel="noopener noreferrer">
                        <div className="underline underline-offset-6 flex gap-2">Report Issues <SquareArrowOutUpRight /> </div>
                    </a>

                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <span className="text-2xl">Collaboration</span>
                    <span className="font-extralight">This project is open-source. You can contribute by adding feature or improving the existing ones.</span>
                    <a href="https://github.com/MAYANK-T0MAR/json_schema_builder" target="_blank" rel="noopener noreferrer">
                        <div className="underline underline-offset-6 flex gap-2">Github Repo <SquareArrowOutUpRight /> </div>
                    </a>

                </div>
            </div>
        </div>
    )
}