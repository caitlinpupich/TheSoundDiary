import AudioPlayer from "./components/audioPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 max-w-2xl mx-auto flex flex-col justify-center gap-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">The Sound Diary</h1>
        <p className="text-zinc-400">Audio, text, and visual logs.</p>
      </header>

      <section className="space-y-4">
        <AudioPlayer
          title="Hike with Wind"
          src="/audio/Hike with Wind.m4a"
        />
      </section>
    </main>
  );
}