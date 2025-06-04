import { Image } from "@/components/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Team } from "@/sanity/types";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@/components/image";
import { PortableText } from "next-sanity";

export type TeamProps = {
  block: Team;
};

export function Team({ block }: TeamProps) {
  return (
    <section className="container flex flex-col gap-8 py-16">
      <h2 className="text-2xl font-bold">{block.title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {block.members?.map((member) => (
          <Card key={member._key}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  {member.image && (
                    <AvatarImage
                      image={member.image}
                      alt={member.name}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-8">
              <div className="prose prose-sm text-muted-foreground text-balance">
                <PortableText value={member.bio} />
              </div>

              <div className="flex items-center gap-2">
                {member.socials.map((social) => (
                  <Link key={social._key} href={social.url}>
                    <Image
                      image={social.icon}
                      alt={social.title}
                      className="size-5"
                    />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
