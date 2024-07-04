import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">
        Welcome to the Catalyst
      </h1>
      <Image
        src="/catalyst.png"
        alt="The Catalyst"
        width={500}
        height={500}
        className="rounded-full"
      />
      
      <a
        href="/prediction"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  
      >
        Prediction
      </a>

    </main>
  );
}
