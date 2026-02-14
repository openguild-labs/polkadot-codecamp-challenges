"use client";

import { useChain } from "@luno-kit/react";

export default function NetworkBadge() {
  const { chain } = useChain();

  if (!chain) return null;

  return (
    <div className="network-badge">
      <span className="network-dot" />
      {chain.name}
    </div>
  );
}
