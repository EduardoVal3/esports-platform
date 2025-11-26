import Link from "next/link";
import { IconTrophy } from "@tabler/icons-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
            <IconTrophy className="size-5 text-white" />
          </div>
          <span className="text-lg font-semibold">eSports Platform</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}