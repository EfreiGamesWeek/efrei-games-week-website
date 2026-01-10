"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownFromLine } from "lucide-react";

export default function Home() {
  function fixTextToXDigits(number, x) {
    return number < 10 ? "0".repeat(x - 1) + number : number;
  }
  var countDownDate = new Date("Feb 5, 2026 19:30:00").getTime();
  const [countDownTimer, setCountDownTimer] = useState("");

  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountDownTimer(
      fixTextToXDigits(days, 2) +
        ":" +
        fixTextToXDigits(hours, 2) +
        ":" +
        fixTextToXDigits(minutes, 2) +
        ":" +
        fixTextToXDigits(seconds, 2)
    );

    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);
  return (
    <main>
      <section className=" flex flex-col gap-4 justify-center items-center h-[90dvh] text-center mx-8">
        <h2 className="md:text-2xl text-xl font-bold">
          La GameJam nationale commence dans :
        </h2>
        <h1 className="md:text-8xl text-5xl font-extrabold">
          {countDownTimer}
        </h1>
        <Button className="mt-4 w-40 md:text-xl text-lg h-12">
          S'inscrire
        </Button>
        <footer className="flex flex-col items-center">
          <h2 className="md:text-lg text-sm font-semibold mt-4">
            En savoir plus
          </h2>
          <Button variant="ghost" className="w-fit h-fit">
            <ArrowDownFromLine className="h-8! w-8!" />
          </Button>
        </footer>
      </section>
      <section className="flex flex-col gap-4 p-16 justify-center items-center text-center bg-primary text-primary-foreground">
        <h2 className="text-2xl font-bold">
          Votre GameJam, qu'est ce que c'est ?
        </h2>
        <p className="">La GameJam</p>
      </section>
    </main>
  );
}
