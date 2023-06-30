import LuckyDraw from "./";
import { render, fireEvent, waitFor, act } from "@testing-library/react";

/**
 * Using RTL requires knowledge of the libraries used
 * e.g. to test if cards are flipped, dev needs to look at the class names used by react-flip-card
 *
 */
describe("LuckyDraw", () => {
  describe("Control Panel", () => {
    it("adds card when size slider is adjusted", async () => {
      const { getByTestId, container } = render(<LuckyDraw initialSize={2} />);

      expect(getUnflippedCardCount(container)).toHaveLength(4);

      // adjust size to be 10
      fireEvent.input(getByTestId("size-slider"), { target: { value: 10 } });

      await waitFor(() =>
        expect(getUnflippedCardCount(container)).toHaveLength(100)
      );
    });

    it("changes the card content when toggleing between types", () => {});

    it("unflips all cards when reset button is clicked", async () => {
      const { getByTestId, container } = render(<LuckyDraw initialSize={2} />);

      // original state: no card is flipped
      expect(getUnflippedCardCount(container)).toHaveLength(4);

      // Arrange
      fireEvent.click(getByTestId("draw-button"));

      // Wait until dra finished
      await waitFor(() =>
        expect(getFlippedCardCount(container)).toHaveLength(1)
      );

      // Act: Reset
      fireEvent.click(getByTestId("reset-button"));

      // Assert
      await waitFor(() =>
        expect(getFlippedCardCount(container)).toHaveLength(0)
      );
    });
  });

  describe("Draw", () => {
    it("flips all of the cards except one, when it ends", async () => {
      const { getByTestId, container } = render(<LuckyDraw initialSize={2} />);

      // original state: no card is flipped
      expect(getUnflippedCardCount(container)).toHaveLength(4);

      // Act
      fireEvent.click(getByTestId("draw-button"));

      // Assert only one card is not flipped
      await waitFor(() =>
        expect(getFlippedCardCount(container)).toHaveLength(1)
      );
    });

    it("flows confettis when the draw finishes", async () => {
      const { getByTestId, container } = render(<LuckyDraw initialSize={2} />);

      // original state: no card is flipped
      expect(getFlippedCardCount(container)).toHaveLength(0);

      //  draw
      fireEvent.click(getByTestId("draw-button"));

      // assert
      await waitFor(() =>
        expect(getByTestId("confetti-container")).toBeInTheDocument()
      );
    });
  });
});

const getFlippedCardCount = (container) => {
  return container.querySelectorAll(
    `div.react-card-front[style*="transform: rotateY(180deg)"]`
  );
};

const getUnflippedCardCount = (container) => {
  return container.querySelectorAll(
    `div.react-card-front[style*="transform: rotateY(0deg)"]`
  );
};
