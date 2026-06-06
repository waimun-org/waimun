import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  Team as TeamType,
  TeamMember as TeamMemberType,
} from "@/sanity/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@/components/image";
import { PortableText } from "@portabletext/react";
import color from "tinycolor2";
import { Socials } from "../socials";

export type TeamProps = {
  block: TeamType;
};

export function Team({ block }: TeamProps) {
  return (
    <section className="container flex flex-col gap-8 py-8">
      <h2 className="text-2xl font-bold text-balance">{block.title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {block.members.map((member) => (
          <TeamMember key={member._key} member={member} />
        ))}
      </div>
    </section>
  );
}

export type TeamMemberProps = {
  member: TeamMemberType & { _key: string };
};

function TeamMember({ member }: TeamMemberProps) {
  const fallbackAvatar = getFallbackAvatar(member._key, member.name);

  return (
    <Card key={member._key}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-20 text-xl">
            {member.image && (
              <AvatarImage
                image={member.image}
                alt={member.name}
                className="object-cover"
              />
            )}
            <AvatarFallback
              className="font-semibold tracking-tight text-white"
              style={{ background: fallbackAvatar.background }}
            >
              {fallbackAvatar.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <CardTitle>{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>

      {(member.bio ?? member.socials) && (
        <CardContent className="flex flex-col gap-8">
          {member.bio && (
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <PortableText value={member.bio} />
            </div>
          )}

          {member.socials && (
            <div className="flex items-center gap-2">
              <Socials socials={member.socials} />
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function getFallbackAvatar(id: string, name: string) {
  const hash = hashString(id || name);
  const { fromColor, toColor } = generateGradient(hash);
  const angle = 120 + (hash % 90);

  return {
    initials: getInitials(name),
    background: `linear-gradient(${angle}deg, ${fromColor}, ${toColor})`,
  };
}

function generateGradient(hash: number) {
  const hue = hash % 360;
  const saturation = 0.86 + ((hash >> 4) % 12) / 100;
  const lightness = 0.42 + ((hash >> 8) % 14) / 100;
  const from = color({ h: hue, s: saturation, l: lightness });
  const to = from.triad()[1];

  return {
    fromColor: from.toHexString(),
    toColor: to.toHexString(),
  };
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function hashString(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}
