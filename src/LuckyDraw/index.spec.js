import LuckyDraw from "./";
import {render, fireEvent, waitFor, act} from "@testing-library/react";


/**
 * Using RTL requires knowledge of the libraries used
 * e.g. to test if cards are flipped, dev needs to look at the class names used by react-flip-card
 *
 */
describe("LuckyDraw", () => {
    describe("Control Panel", () => {
        it("adds card when size slider is adjusted", () => {
        });

        it("changes the card content when toggleing between types", () => {
        });

        it("unflips all cards when reset button is clicked", () => {
        });
    });

    describe("Draw", () => {
        // it("flips all of the cards except one, when it ends", async () => {
        //   const { getByTestId, container } = render(<LuckyDraw size={2} />);

        //   // original state: no card is flipped
        //   expect(getUnflippedCardCount(container)).toHaveLength(4);

        //   // Act
        //   fireEvent.click(getByTestId("draw-button"));

        //   // Assert only one card is not flipped
        //   await waitFor(() =>
        //     expect(getFlippedCardCount(container)).toHaveLength(1)
        //   );
        // });

        test(
            "flows confettis when the draw finishes",
            async () => {
                const {getByTestId, getAllByText, queryAllByText, container} = render(
                    <LuckyDraw size={2}/>
                );

                // original state: no card is flipped
                expect(queryAllByText("Flipped")).toHaveLength(0);

                //  draw
                fireEvent.click(getByTestId("draw-button"));

                // assert
                await waitFor(() =>
                    expect(getByTestId("confetti-container")).toBeInTheDocument());
            },
        );

        it("takes less time to finish if speed is increased", () => {
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
