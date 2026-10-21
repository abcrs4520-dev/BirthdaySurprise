
const $ = (selector) => document.querySelector(selector);

const page = document.body.dataset.page;

const next = {
  unlock: "gift.html",
  gift: "birthday.html",
  cake: "two-skies.html"
};

// Celebration effects


function confetti(count = 55, duration = 3000) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.textContent = ["💗", "✨", "🌸", "💖", "⭐"][
      Math.floor(Math.random() * 5)
    ];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = 30 + Math.random() * 40 + "vh";
    piece.style.setProperty("--dx", Math.random() * 700 - 350 + "px");
    piece.style.setProperty("--dy", Math.random() * 650 - 320 + "px");
    piece.style.fontSize = 12 + Math.random() * 20 + "px";
    piece.style.setProperty("--confetti-duration", duration + "ms");
    document.body.appendChild(piece);

    piece.style.animationDuration = duration + "ms";

    setTimeout(() => {
      piece.remove();
    }, duration + 200);
  }
}


// Floating petals and hearts
function petals() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const container = $("#particles");

  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");

    el.className = "particle";
    el.textContent = ["🌸", "💗", "✨"][i % 3];

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 8 + Math.random() * 9 + "s";
    el.style.animationDelay = -Math.random() * 15 + "s";
    el.style.fontSize = 12 + Math.random() * 13 + "px";

    container.appendChild(el);
  }
}

petals();

// PAGE 1: SECRET ENTRANCE
if (page === "unlock") {
  const input = $("#passcode");
  const button = $("#unlock");
  const hint = $("#hint");

  // Your new secret password
  const secretCode = "0425";

  button.addEventListener("click", () => {
    if (input.value === secretCode) {
      sessionStorage.setItem("birthday-unlocked", "yes");

      hint.textContent =
        "Ahaa! Baane kanipettav Pichodaa ❤️";

      button.textContent = "Come Inside, My Love 💗";
      button.disabled = true;

      confetti(35);

      setTimeout(() => {
        window.location.href = next.unlock;
      }, 1200);

    } else {
      hint.textContent =
        "Ayyo!, Babu! adhi kaadu needi naadi bday pettu inka!!💕";

      input.value = "";
      input.focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      button.click();
    }
  });
}


/* PAGE 2: GIFT BOX */
if (page === "gift") {
  const present = $("#present");

  if (present) {
    present.addEventListener("click", () => {
      if (present.disabled) return;

      present.classList.add("open");
      present.disabled = true;

      const hint = $("#gift-hint");

      if (hint) {
        hint.textContent = "Your surprise is opening... 💗";
      }

      confetti(65);

      setTimeout(() => {
        $("#gift-reveal")?.classList.remove("hidden");

        if (hint) {
          hint.classList.add("hidden");
        }
      }, 850);
    });
  }
}


// PAGE 3: BIRTHDAY CAKE
if (page === "cake") {
  const blow = $("#blow");

  if (blow) {
    blow.addEventListener("click", () => {
      $(".cake")?.classList.add("blown");

      const message = $("#cake-message");

      if (message) {
        message.textContent =
          "Nuv korukunnadhi jaragaali ani nenu kuda korukuntunna 🫣❤️ .. Next page neekosam pedda surprise ready ga undi";
      }

      blow.textContent = "Devudiki pampinchesa nee wish ✨";

      confetti(70, 4500);
    });
  }
}

// PAGE 5: PHOTO MEMORIES
if (page === "memories") {
  document.querySelectorAll(".polaroid").forEach((button, i) => {
    const file = `assets/photos/photo_${i + 1}.png`;
    const img = new Image();

    img.onload = () => {
      const slot = button.querySelector(".photo-placeholder");

      if (slot) {
        slot.textContent = "";
        slot.appendChild(img);
      }
    };

    img.onerror = () => {};

    img.alt = "Our memory " + (i + 1);
    img.src = file;

    button.addEventListener("click", () => {
      const caption = $("#photo-caption");

      if (caption) {
        caption.textContent = button.dataset.caption || "A special memory ❤️";
      }
    });
  });
}

// PAGE 7: FLIP CARDS
if (page === "reasons") {
  document.querySelectorAll(".flip").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("flipped");

      button.textContent = button.classList.contains("flipped")
        ? button.dataset.back
        : button.dataset.front;
    });
  });
}

// PAGE 8: MUSIC PLAYER
if (page === "music") {
  const audio = $("#song");
  const button = $("#music-button");

  if (audio && button) {
    button.addEventListener("click", async () => {
      if (!audio.paused) {
        audio.pause();

        button.textContent = "▶ Play our song";
        $("#record")?.classList.remove("playing");

        return;
      }

      try {
        await audio.play();

        button.textContent = "⏸ Pause our song";

        $("#record")?.classList.add("playing");

        $("#music-status").textContent =
          "Just you, me, and this song 💗 (emaina gurthosthunnaya 🫣)";

      } catch {
        $("#music-status").textContent =
          "Add your song to assets/music/our-song.mp3 ❤️";
      }
    });

    audio.addEventListener("ended", () => {
      button.textContent = "▶ Play again";
      $("#record")?.classList.remove("playing");
    });
  }
}

// PAGE 9: LOVE LETTER
if (page === "letter") {
  let opened = false;

  const envelope = $("#envelope");

  if (envelope) {
    envelope.addEventListener("click", () => {
      if (opened) return;

      opened = true;

      $("#letter-paper")?.classList.remove("hidden");

      envelope.textContent = "❤️";

      const message =
        "Wish u a very very hpyyyy bdayyyyy to uu bangaram❤️. naa bujjikondaa naa bangarukondaa .. ummahhh ummahhh ummahhh😘😘😘😘😘😘😘😘😘😘 inka boldu hugs kuda neeku .. for(int i=22;i<=100;i++){ System.out.println('Happy Birthday Pichodaa'+i);} appude 'i' years ochesay neeku.. chala chala chaaaaaaaaalaaa pedda position ki velli chala dabbul sampandinchali nuvvuu uncle ninnu chusi proud feel ayye day osthadi ani naaku telsu and nuv pakka chesthav kuda ala..  manchiga undu manchiga nerchuko new tngs, Devudu edoka kashtaalu thappakunda pedathadu kada nuv mentally spr strong ani ninnu physically weak cheddam anukuntnadu ala ani nuv weak aypokudadu.. baaga thinu baaga water thaagu baaaaaga healthy ga undu 🫂.. healthy man avvali.. 💗 ninnu meet ayyaka 1st tym anukunta gift ivvatle nenu🙁.. ala ani chinna bday wish tho odileyali ani ledu andukani ila alochincha hope neek nachindhi anukuntna.. ekkadaina over express chesi unte (This is letter from ur Ammu to my Pichoda ani gurthupetko) future lo nee anni bdays ki wish chese situations raakpovachu but remember naa brain chala sharp dates gurthupetkodam lo nee evry bday naak gurthuntadi .. if nen wish cheyle ani anipisthe ee letter malli chaduvu evry year nee bday ki naa wishes indulo untay anduke for loop petta 🥰.. and nen spr strong ga unta naa gurinchi bayapadaku evar help lekunda evar meedha depend avkunda life ela lead cheyyali nerpinchav and nen alane unta🦁💪..Sry ninnu sarigga chuskolenanduku🥺 .. Tnq nannu chala baa chuskunanduku🫂.. and chaal ippatike ekkuv maatladesa 'I Love You❤️' 'Miss you so much nanna🙁🥺'";
        
      const target = $("#typed-letter");

      if (!target) return;

      let n = 0;

      const timer = setInterval(() => {
        n += 3;

        target.textContent = message.slice(0, n);

        if (n >= message.length) {
          clearInterval(timer);
        }
      }, 22);
    });
  }
}

// PAGE 10: FINAL SURPRISE

 // PAGE 10: FINAL SURPRISE
if (page === "final") {
  const finale = $("#finale");

  if (finale) {
    finale.addEventListener("click", () => {
      const message = $("#final-message");

      if (message) {
        message.textContent =
          "Sending you a million hugs, my Pichodaa! 🫂❤️";
      }

      // Remove previous hugs if the button is clicked again
      document.querySelector("#hugs-container")?.remove();

      // Create the hugs container
      const container = document.createElement("div");
      container.id = "hugs-container";
      container.setAttribute("aria-hidden", "true");
      document.body.appendChild(container);

      // Hugs and hearts instead of stars!
      const emojis = ["🫂", "🤗", "💕", "💗", "❤️", "🥹", "💖"];

      for (let i = 0; i < 50; i++) {
        const hug = document.createElement("span");

        hug.className = "floating-hug";
        hug.textContent =
          emojis[Math.floor(Math.random() * emojis.length)];

        hug.style.left = Math.random() * 95 + "%";
        hug.style.top = Math.random() * 90 + "%";
        hug.style.animationDelay = Math.random() * 1.2 + "s";
        hug.style.fontSize = 22 + Math.random() * 28 + "px";

        container.appendChild(hug);
      }

      finale.textContent = "More hugs for you! 🫂💗";
    });
  }
}

/* CRICKET PAGE: SRH BIRTHDAY SPECIAL */

/* SRH BIRTHDAY PAGE: TAP PLAYERS TO REVEAL WISHES */
if (page === "skies") {
  document.querySelectorAll(".player-card").forEach((card) => {
    card.addEventListener("click", () => {
      const message = card.querySelector(".wish-message");
      const prompt = card.querySelector(".wish-prompt");
      const opening = card.getAttribute("aria-expanded") !== "true";

      card.setAttribute("aria-expanded", String(opening));
      card.classList.toggle("is-open", opening);

      if (message) {
        message.hidden = !opening;
        message.textContent = opening ? card.dataset.wish : "";
      }

      if (prompt) {
        prompt.hidden = opening;
      }
    });
  });
}

/* KL RAHUL BIRTHDAY SURPRISE */
const klRevealButton = document.getElementById("kl-reveal-btn");
const klWishCard = document.getElementById("kl-wish-card");

if (klRevealButton && klWishCard) {
  klRevealButton.addEventListener("click", () => {
    const opening = klWishCard.hidden;

    klWishCard.hidden = !opening;
    klRevealButton.setAttribute("aria-expanded", String(opening));

    klRevealButton.textContent = opening
      ? "🧡 Hide Birthday Wish"
      : "🎁 Reveal KL Rahul's Birthday Wish";

    if (opening) {
      klWishCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
}

/* STADIUM PAGE: AUTOPLAY BIRTHDAY SONG */
const birthdaySong = document.getElementById("birthday-song");
const musicToggle = document.getElementById("music-toggle");
const musicBars = document.getElementById("music-bars");

if (birthdaySong && musicToggle && musicBars) {
  // Try to start the song as soon as the page opens
  birthdaySong.play().then(() => {
    musicToggle.textContent = "❚❚";
    musicToggle.setAttribute("aria-label", "Pause birthday song");
    musicBars.classList.add("playing");
  }).catch(() => {
    // Browser blocked autoplay: let the visitor start it
    musicToggle.textContent = "🔊";
    musicToggle.setAttribute("aria-label", "Start birthday song");
    musicToggle.title = "Tap to start the birthday song 🧡";
  });

  // Play or pause whenever the button is clicked
  musicToggle.addEventListener("click", async () => {
    if (birthdaySong.paused) {
      try {
        await birthdaySong.play();
        musicToggle.textContent = "❚❚";
        musicToggle.setAttribute("aria-label", "Pause birthday song");
        musicBars.classList.add("playing");
      } catch (error) {
        musicToggle.textContent = "🔊";
      }
    } else {
      birthdaySong.pause();
      musicToggle.textContent = "▶";
      musicToggle.setAttribute("aria-label", "Play birthday song");
      musicBars.classList.remove("playing");
    }
  });

  birthdaySong.addEventListener("ended", () => {
    musicToggle.textContent = "▶";
    musicBars.classList.remove("playing");
  });
}
