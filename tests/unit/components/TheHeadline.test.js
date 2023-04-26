import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/TheHeadline.vue";
import { vi } from "vitest";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  // verifikasi kata yang dirender terlebih dahulu

  // Penggunaan timer palsu atau tiruan dengan vi.useFakeTimers() pada pengujian
  // ini bertujuan untuk mengisolasi komponen TheHeadline dan memastikan
  // bahwa komponen tersebut hanya diuji secara spesifik tanpa
  // terpengaruh oleh faktor eksternal seperti waktu yang tidak terkendali.
  it("display introductory action verb", () => {
    vi.useFakeTimers();
    render(TheHeadline);

    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
    vi.useRealTimers();

    // Terakhir, pengujian menggunakan vi.useRealTimers() untuk
    // mengembalikan penggunaan timer menjadi normal setelah pengujian selesai.
    // Hal ini berguna untuk memastikan bahwa kode di lingkungan pengujian
    // kembali ke pengaturan waktu normal dan tidak mempengaruhi pengujian
    // selanjutnya.
  });

  it("changes action verb at a consistent interval", () => {
    // Kemudian, fungsi vi.fn() digunakan untuk membuat mock function
    // yang akan digunakan sebagai pengganti fungsi setInterval.
    // Fungsi vi.stubGlobal() digunakan untuk mengganti fungsi setInterval
    // di lingkungan global dengan mock function yang telah dibuat.

    vi.useFakeTimers();
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("swap action verb after interval", async () => {
    vi.useFakeTimers();
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
    vi.useRealTimers();
  });
});
