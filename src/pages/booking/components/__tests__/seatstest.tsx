import * as React from "react";
import { shallow } from "enzyme";


import Seat, { ISeatProps } from "../sector/Seat";
import { SeatType } from "../../model/SeatTypeEnum";

function setup(p?: {}) {
    const props: ISeatProps = {
        ...(p || {}),
        seatType: SeatType.default,
        xAxis: 10,
        yAxis: 20
    };

    const wrapper = shallow(<Seat {...props} />);
    return { wrapper, props };
}

describe("Seat Test Suite", () => {
    it("Should have 2 rect", () => {
        const { wrapper } = setup();
        expect(wrapper.find("rect").length).toBe(2);
    });

    it("Should have correct position", () => {
        const { wrapper, props } = setup();
        [0, 1].forEach((i) => {
            expect(wrapper.find("rect").at(i).prop('x')).toBe(props.xAxis + i * 1);
            expect(wrapper.find("rect").at(i).prop('y')).toBe(props.yAxis + i * 8);
        });
    });

    it("Should become taken on mousedown", () => {
        const { wrapper } = setup();
        //default color
        expect(wrapper.prop("fill")).toBe("#e7e8ed");
        wrapper.simulate('mousedown');
        //reserved
        expect(wrapper.prop("fill")).toBe("#0cc347");
    })

    it("Should become taken on mousemove", () => {
        const { wrapper } = setup({ isPinned: true });
        //default color
        expect(wrapper.prop("fill")).toBe("#e7e8ed");
        wrapper.simulate('mousemove');
        //reserved
        expect(wrapper.prop("fill")).toBe("#0cc347");
    })

    it("Should be called onSelect", () => {
        let onSelect = jest.fn();
        const { wrapper } = setup({ onSelect: onSelect });
        wrapper.simulate("mousedown");
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(true);

        wrapper.simulate("mousedown");
        expect(onSelect).toHaveBeenCalledTimes(2);
        expect(onSelect).toHaveBeenCalledWith(false);

    })
});
