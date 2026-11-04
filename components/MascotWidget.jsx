
"use client";

import { Mascot } from "page-mascot";

export default function MascotWidget() {
  return (
    <div >
      <Mascot
        directions="/mascots/fox-directions.webp"
        reactions="/mascots/fox-reactions.webp"
        size={120}
        label="fox"
      />
    </div>
  );
}
