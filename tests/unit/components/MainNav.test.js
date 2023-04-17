import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";

// Fungsi render dari Vue Testing Library adalah fungsi yang digunakan untuk merender sebuah komponen Vue ke dalam virtual DOM
// Fungsi screen.debug() pada library test Vue digunakan untuk menampilkan output atau informasi tambahan tentang komponen Vue yang sedang diuji

describe("MainNav", () => {
  it("display company name", () => {
    render(MainNav);
    screen.debug();
  });
});
