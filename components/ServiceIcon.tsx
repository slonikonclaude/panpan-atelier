import type { SVGProps } from "react";
import { IconBag, IconCard, IconCup, IconPhone, IconSnow, IconUmbrella, IconWheelchair, IconWifi } from "@/components/icons";
import type { ServiceKey } from "@/lib/restaurant";

/** Иконка удобства из списка `restaurant.services` (DESIGN.md §7.8). */
const ICONS = {
  dineIn: IconCup,
  takeaway: IconBag,
  orders: IconPhone,
  terrace: IconUmbrella,
  wifi: IconWifi,
  aircon: IconSnow,
  wheelchair: IconWheelchair,
  cards: IconCard,
} satisfies Record<ServiceKey, (p: SVGProps<SVGSVGElement>) => React.JSX.Element>;

export function ServiceIcon({ name, ...p }: { name: ServiceKey } & SVGProps<SVGSVGElement>) {
  const Icon = ICONS[name];
  return <Icon {...p} />;
}
