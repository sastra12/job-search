import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/TheHeadline.vue";
import { vi } from "vitest";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  // verifikasi kata yang dirender terlebih dahulu

  // Penggunaan timer palsu atau tiruan dengan vi.useFakeTimers() pada pengujian
  // ini bertujuan untuk mengisolasi komponen TheHeadline dan memastikan
  // bahwa komponen tersebut hanya diuji secara spesifik tanpa
  // terpengaruh oleh faktor eksternal seperti waktu yang tidak terkendali.
  it("display introductory action verb", () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();

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

    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("swap action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("remove interval when component dissappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
