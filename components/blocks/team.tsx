import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Team, TeamMember } from "@/sanity/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@/components/image";
import { PortableText } from "next-sanity";
import { Socials } from "../socials";

export type TeamProps = {
  block: Team;
};

export function Team({ block }: TeamProps) {
  return (
    <section className="container flex flex-col gap-8 py-16">
      <h2 className="text-2xl font-bold">{block.title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {block.members.map((member) => (
          <TeamMember key={member._key} member={member} />
        ))}
      </div>
    </section>
  );
}

export type TeamMemberProps = {
  member: TeamMember & { _key: string };
};

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <Card key={member._key}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="size-20">
            {member.image && (
              <AvatarImage
                image={member.image}
                alt={member.name}
                className="object-cover"
              />
            )}
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <CardTitle>{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        {member.bio && (
          <div className="prose prose-sm text-muted-foreground text-balance">
            <PortableText value={member.bio} />
          </div>
        )}

        {member.socials && (
          <div className="flex items-center gap-2">
            <Socials socials={member.socials} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
