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

const gradientPairs = [
  ["var(--chart-1)", "var(--chart-2)"],
  ["var(--chart-2)", "var(--chart-4)"],
  ["var(--chart-3)", "var(--chart-1)"],
  ["var(--chart-4)", "var(--chart-5)"],
  ["var(--chart-5)", "var(--chart-2)"],
  ["var(--primary)", "var(--chart-1)"],
] as const;

function getFallbackAvatar(id: string, name: string) {
  const hash = hashString(id || name);
  const [from, to] = gradientPairs[hash % gradientPairs.length];
  const angle = 120 + (hash % 90);
  const highlightX = 20 + (hash % 60);
  const highlightY = 15 + ((hash >> 3) % 55);

  return {
    initials: getInitials(name),
    background: [
      `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgb(255 255 255 / 0.38), transparent 34%)`,
      `linear-gradient(${angle}deg, ${from}, ${to})`,
    ].join(", "),
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
