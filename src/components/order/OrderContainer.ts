import styled from "styled-components";

export const OrderContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px 7px #f9f8f9;
  width: 300px;
  background: #fff;
  font-size: 16px;

  > div.title {
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 20px;
    font-weight: bold;
  }

  > div.order {
    background: #f9f8f9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    > .order-content {
      width: 270px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 5px 5px #eaeaea;

      > .order-content-title,
      > .order-content-info {
        background-image: linear-gradient(to right, lightgray 33%, #fff 0%);
        background-position: bottom;
        background-size: 5px 1px;
        background-repeat: repeat-x;
        position: relative;
      }

      > .order-content-info {
        padding: 20px;
        font-family: "Work Sans", sans-serif;
        font-size: 0.75em;
        grid-area: e-info;
        display: grid;
        align-self: center;
        grid-template: auto auto / 1.5fr 1fr;

        > div {
          padding-bottom: 10px;
          > div.info-value {
            font-weight: bold;
          }
          > div.info-title {
            color: #b1b5c6;
            font-size: 0.8em;
          }
        }
      }

      > .order-content-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80px;
        > .event {
          color: #d86568;
          font-size: 0.8em;
          font-weight: bold;
        }

        > .descr {
          font-size: 0.6em;
          color: #a7a7a7;
          margin-top: 10px;
        }
      }

      > .order-content-title:before,
      > .order-content-info:before {
        content: "";
        display: block;
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        bottom: -10px;
        left: -10px;
        background-image: linear-gradient(to right, #f9f8f9, #eaeaea);
      }

      > .order-content-title:after,
      > .order-content-info:after {
        content: "";
        display: block;
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        bottom: -10px;
        right: -10px;
        background-image: linear-gradient(to left, #f9f8f9, #eaeaea);
      }

      > .order-content-seats {
        display: grid;
        grid-template: auto auto / 1fr 30px;
        row-gap: 1em;
        font-size: 0.75em;
        padding: 20px;
        > .seats-owner {
          display: flex;
          flex-direction: column;
          > .seats-owner-name {
            font-weight: bold;
          }
          > .seats-owner-label {
            font-size: 0.8em;
            color: #a7a7a7;
          }
        }
        > .seats-edit,
        > .seats-add {
          align-self: center;
          justify-self: center;
          > button {
            height: 25px;
            width: 25px;
            border: 1px solid #e54b4b;
            border-radius: 5px;
            background-color: #e54b4b;
            cursor: pointer;
            color: #fff;
            box-shadow: 0 3px 5px #bbbbbb;
            font-size: 0.9em;
            &:focus {
                outline: none;
            }
            &:active {
                color: #d8d8d8;
            }
          }
        }
        > .selection {
          overflow: auto;
          flex: 1;
          font-family: "Work Sans", sans-serif;

          &::-webkit-scrollbar {
            width: 0.5em;
          }

          &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          }

          &::-webkit-scrollbar-thumb {
            background-color: #e8e8e8;
            outline: 1px solid slategrey;
          }

          > .selection-row {
            display: flex;
            flex-direction: row;

            & + .selection-row {
              margin-top: 15px;
            }

            > .selection-row-item {
              font-size: 0.9em;
              > span {
                display: block;
              }

              & + .selection-row-item {
                margin: 0 0px 0 20px;
              }

              > .selection-row-item-value {
                font-weight: bold;
              }

              > .selection-row-item-title {
                font-size: 0.8em;
                color: #b3b3b3;
              }
            }
          }
        }
      }
    }
  }

  div.footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 0;
    padding: 20px;
    align-items: center;
    > .price {
      width: 100%;
      text-align: center;
      background: #dcf8e5;
      padding: 10px;
      font-size: 0.8em;
      color: #3bc067;
      font-weight: bold;
    }

    > .button-container > button {
      border: 1px solid #e54b4b;
      border-radius: 5px;
      background-color: #e54b4b;
      cursor: pointer;
      box-shadow: 0 3px 5px #bbbbbb;
      width: 160px;
      color: rgba(255, 255, 255, 0.9);
      padding: 5px;
      color: #fff;
      &:focus {
        outline: none;
      }
      &:active {
        color: #d8d8d8;
      }
    }
  }
`;
