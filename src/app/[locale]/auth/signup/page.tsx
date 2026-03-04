import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <SignupForm />
        </div>
    );
}
