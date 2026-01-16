import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-6 py-4">
      <Link
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="/"
      >
        Bridge
      </Link>
      <Link
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="/faucet"
      >
        Faucet
      </Link>
      <a
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="https://explorer.hyperbridge.network"
        target="_blank"
      >
        Explorer
      </a>
    </nav>
  );
}
