import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  const blocks = [{
    id: "5",
    type: "blocks",
    attributes: {
      index: 1,
      timestamp: 1530679678,
      data: "The Human Torch",
      "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
      hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
    }
  }];

  describe('#checkNodeStatus', () => {
    it("should fetch the node status", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json() {
            return Promise.resolve({ node_name: "Secret Lowlands" });
          },
        })
      );
      await ActionCreators.checkNodeStatus(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.CHECK_NODE_STATUS_START,
          node,
        },
        {
          type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
          node,
          res: { node_name: "Secret Lowlands" },
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });
  
    it("should fail to fetch the node status", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          status: 400,
        })
      );
      await ActionCreators.checkNodeStatus(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.CHECK_NODE_STATUS_START,
          node,
        },
        {
          type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
          node,
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });

    it("should fail on an unexpected error", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.reject(new Error('Unexpected error'))
      );
      await ActionCreators.checkNodeStatus(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.CHECK_NODE_STATUS_START,
          node,
        },
        {
          type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
          node,
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });
  });

  describe('#getNodeBlocks', () => {
    it("should fetch the node blocks", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json() {
            return Promise.resolve({
              data: blocks
            });
          },
        })
      );
      await ActionCreators.getNodeBlocks(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.GET_NODE_BLOCKS_LOADING,
          node,
        },
        {
          type: ActionTypes.GET_NODE_BLOCKS_SUCCESS,
          node,
          res: {
            data: blocks
          },
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });
  
    it("should fail to fetch the node blocks", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          status: 400,
        })
      );
      await ActionCreators.getNodeBlocks(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.GET_NODE_BLOCKS_LOADING,
          node,
        },
        {
          type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
          node,
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });

    it("should fail on an unexpected error", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.reject(new Error('Unexpected error'))
      );
      await ActionCreators.getNodeBlocks(node)(dispatch);
      const expected = [
        {
          type: ActionTypes.GET_NODE_BLOCKS_LOADING,
          node,
        },
        {
          type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
          node,
        },
      ];
  
      expect(dispatch.mock.calls.flat()).toEqual(expected);
    });
  });
});
