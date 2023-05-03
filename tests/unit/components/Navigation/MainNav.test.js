import { render, screen } from "@testing-library/vue";

import { RouterLinkStub } from "@vue/test-utils";

import userEvent from "@testing-library/user-event";
import MainNav from "@/components/Navigation/MainNav.vue";

// Fungsi render dari Vue Testing Library adalah fungsi yang digunakan untuk merender sebuah komponen Vue ke dalam virtual DOM
// Fungsi screen.debug() pada library test Vue digunakan untuk menampilkan output atau informasi tambahan tentang komponen Vue yang sedang diuji

// screen adalah objek yang disediakan oleh Vue Testing Library untuk
// memberikan akses langsung ke seluruh elemen yang telah dirender pada dokumen
// dalam tes.

// assertion adalah sebuah pernyataan yang digunakan untuk memeriksa atau memvalidasi kondisi tertentu dalam sebuah program,
// dan akan menghasilkan pesan kesalahan jika kondisi tersebut tidak terpenuhi.

// Pada dasarnya, expect membandingkan nilai yang diharapkan dengan nilai
// aktual yang diperoleh dari hasil render komponen Vue.
// Jika nilai tersebut tidak sesuai, maka asserstion akan gagal dan tes
// akan dianggap gagal.

// Dengan menggunakan it, Anda dapat memastikan bahwa
// komponen Vue berperilaku sesuai dengan yang diharapkan

describe("MainNav", () => {
  it("display company name", () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
    screen.getByText("SAS Corporation");
    const companyName = screen.getByText("SAS Corporation");
    expect(companyName).toBeInTheDocument();
  });

  // ketika user login apa yang kita lakukan?
  describe("when user logged in", () => {
    // tampilkan profile picture
    it("display user profile picture", async () => {
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
            RouterLink: RouterLinkStub,
          },
        },
      });
      // getByRole adalah salah satu metode yang tersedia di Vue Testing Library yang
      // digunakan untuk mencari elemen berdasarkan peran atau fungsi yang diemulasikan dalam komponen Vue.

      // queryByRole akan mereturn null jika tidak ditemukan
      let profileimage = screen.queryByRole("img", {
        // optional, buat menentukan spesifik element yang dituju
        name: /user profile image/i,
      });
      //
      expect(profileimage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });

      // click pada user event ini me return promise
      await userEvent.click(loginButton);
      profileimage = screen.queryByRole("img", {
        // optional, buat menentukan spesifik element yang dituju
        name: /user profile image/i,
      });
      //
      expect(profileimage).toBeInTheDocument();
    });
  });
});
