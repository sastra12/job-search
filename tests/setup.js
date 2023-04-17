// Cleanup pada testing library Vue akan menghapus semua instance Vue yang dibuat pada saat testing,
// sehingga mencegah terjadinya memory leak dan memastikan bahwa tes berjalan dengan cepat dan efisien.

// Matcher pada Jest DOM sangat membantu dalam mengecek apakah elemen atau komponen Vue telah dibuat dengan benar dan sesuai dengan kebutuhan aplikasi.
// Dengan menggunakan matcher, pengguna dapat memastikan bahwa setiap elemen atau komponen Vue bekerja dengan baik dan sesuai dengan harapan.

// AfterEach biasanya digunakan untuk membersihkan atau mereset keadaan (state) pada aplikasi Vue.js setelah satu test case selesai dijalankan.
// Hal ini dilakukan agar keadaan aplikasi selalu bersih dan terisolasi antara satu test case dengan test case lainnya.

// Expect pada library testing Vue.js Vitest adalah sebuah fungsi yang digunakan untuk melakukan asserstion atau pengujian nilai (value) pada test case.
// Fungsi ini membandingkan nilai yang diharapkan (expected) dengan nilai yang diberikan atau dihasilkan pada test case.

import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

// digunakan untuk menambahkan custom matcher ke dalam expectation (ekspektasi) atau asserstion (pengujian nilai) yang tersedia di Jest.
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
