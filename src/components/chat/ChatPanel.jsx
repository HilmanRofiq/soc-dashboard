import { sendChat } from "@/api/chat";
import { useDevice } from "@/context/DeviceContext";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { MessageSquareText, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GREETING = {
    id: "greeting",
    role: "assistant",
    text: "Halo! Tanyakan apa saja tentang kondisi tanah di device yang dipilih.",
};

export default function ChatPanel() {
    const { selectedId } = useDevice();
    const [messages, setMessages] = useState([GREETING]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    const addMessage = (role, text, isError = false) =>
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role, text, isError }]);

    const { mutate, isPending } = useMutation({
        mutationFn: text => sendChat(selectedId, text),
        onSuccess: data => addMessage("assistant", data.reply),
        onError: err => addMessage("assistant", `Maaf, terjadi kesalahan: ${err.message}`, true),
    });

    // Scroll otomatis ke pesan terbaru
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isPending]);

    const handleSubmit = e => {
        e.preventDefault();
        const text = input.trim();
        if (!text || isPending) return;
        addMessage("user", text);
        setInput("");
        mutate(text);
    };

    return (
        <section className="glass-card flex min-h-[380px] flex-1 flex-col overflow-hidden p-0">
            <header className="flex items-center gap-2 bg-brand px-4 py-2 text-white">
                <MessageSquareText size={20} />
                <h2 className="text-lg">Ask Our Assistant!</h2>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-surface/70 p-4">
                {messages.map(m => (
                    <div key={m.id} className={clsx("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                        <p
                            className={clsx(
                                "max-w-[80%] whitespace-pre-wrap break-words px-3 py-2 text-sm",
                                m.role === "user"
                                    ? "rounded-l-lg rounded-br-lg bg-brand text-white"
                                    : "rounded-r-lg rounded-bl-lg bg-gray-300 text-ink",
                                m.isError && "bg-bad/20 text-bad",
                            )}
                        >
                            {m.text}
                        </p>
                    </div>
                ))}

                {isPending && (
                    <div className="flex justify-start">
                        <p className="rounded-r-lg rounded-bl-lg bg-gray-300 px-3 py-2 text-sm text-ink/60">
                            Sedang mengetik...
                        </p>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="m-3 flex items-center gap-2 rounded-full border border-ink/50 bg-white px-3 py-1"
            >
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Message..."
                    aria-label="Tulis pesan"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isPending}
                    aria-label="Kirim pesan"
                    className="text-ink transition hover:text-brand disabled:opacity-40"
                >
                    <Send size={18} />
                </button>
            </form>
        </section>
    );
}
