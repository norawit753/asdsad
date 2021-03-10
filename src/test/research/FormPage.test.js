import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormPage } from "../../components/Page/research/FormPage";

// test("renders learn react link", () => {
//   render(<FormPage />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("ResearchForm", () => {
  it("render basic fields", () => {
    render(<FormPage />);
    expect(
      screen.getByRole("article", { name: /article/i })
    ).toBeInTheDocument();
  });
});
