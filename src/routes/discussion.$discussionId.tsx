import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MessageCircle, Shield } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { POSTS, type Post, type Reply } from "@/routes/community";

export const Route = createFileRoute("/discussion/$discussionId")({
  loader: ({ params }) => {
    const post = POSTS.find((item) => String(item.id) === params.discussionId);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} — CycleBloom` : "Discussion — CycleBloom" }] }),
  component: DiscussionPage,
});

function DiscussionPage() {
  const post = Route.useLoaderData() as Post;
  const related = POSTS.filter((item) => item.cat === post.cat && item.id !== post.id).slice(0, 3);
  return (
    <AppShell title="Discussion">
      <Link to="/community" className="text-sm font-semibold text-violet-doux">← Retour à la communauté</Link>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <main className="space-y-5">
          <article className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-vif to-violet-doux font-bold text-white">{post.avatar}</div><div><p className="font-semibold">{post.author}</p><p className="text-xs text-muted-foreground">{post.time} · {post.cat}</p></div></div>
            <h1 className="mt-5 font-display text-2xl font-bold">{post.title}</h1><p className="mt-3 leading-relaxed text-foreground/75">{post.preview}</p>
            <div className="mt-5 flex gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {post.likes}</span><span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {post.replies.length} réponses</span></div>
          </article>
          {post.replies.map((reply: Reply, index: number) => <article key={`${reply.author}-${index}`} className={`rounded-3xl p-5 ${reply.isExpert ? "border-2 border-violet-doux/30 bg-violet-doux/5" : "glass border border-white/70"}`}><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-doux font-bold text-white">{reply.avatar}</div><div><div className="flex items-center gap-2"><p className="text-sm font-semibold">{reply.author}</p>{reply.isExpert && <span className="flex items-center gap-1 rounded-full bg-violet-doux/10 px-2 py-0.5 text-[10px] font-bold text-violet-doux"><Shield className="h-3 w-3" /> {reply.expertTitle}</span>}</div><p className="text-xs text-muted-foreground">{reply.time}</p></div></div><p className="mt-3 leading-relaxed text-foreground/75">{reply.text}</p><p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Heart className="h-3 w-3" /> {reply.likes}</p></article>)}
        </main>
        <aside className="glass h-fit rounded-3xl border border-white/70 p-5 shadow-bloom"><h2 className="font-display text-lg font-bold">Discussions liées</h2><div className="mt-4 space-y-3">{related.length ? related.map((item) => <Link key={item.id} to="/discussion/$discussionId" params={{ discussionId: String(item.id) }} className="block rounded-2xl bg-white/60 p-3 text-sm font-semibold transition hover:bg-white">{item.title}<span className="mt-1 block text-xs font-normal text-muted-foreground">{item.replies.length} réponses</span></Link>) : POSTS.filter((item) => item.id !== post.id).slice(0, 3).map((item) => <Link key={item.id} to="/discussion/$discussionId" params={{ discussionId: String(item.id) }} className="block rounded-2xl bg-white/60 p-3 text-sm font-semibold">{item.title}</Link>)}</div></aside>
      </div>
    </AppShell>
  );
}