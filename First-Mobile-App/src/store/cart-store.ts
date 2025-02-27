import { create } from "zustand";
import { PRODUCTS } from "../../assets/products";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};

// Above is our type for each individual item.

type CartState = {
  items: CartItemType[]; //  CartItemType[] is used for defining not for implementing
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => string;
  getItemCount: () => number;
};

// Above is our types for our cart state
// this includes types and fucntions that return types

const initialCartItems: CartItemType[] = []; // implementing here

// Above we initialize our initialCartItems to be a array with type CartItemType

export const useCartStore = create<CartState>((set, get) => ({
  items: initialCartItems,
  // Above, sets items as a empty array of type CartItemType
  addItem: (item: CartItemType) => {
    // add item recieves a item
    const existingItem = get().items.find((i) => i.id === item.id);
    // checks if the item is in the cart by finding a match match with the id's.
    if (existingItem) {
      // if item exists in the cart we set the state
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: Math.min(
                  i.quantity + item.quantity,
                  PRODUCTS.find((p) => p.id === item.id)?.maxQuantity ||
                    i.quantity
                ),
              }
            : i
        ),
      }));

      // set the state by mapping over the current items.
      // checking for a id match between each item and it item passed in
      // if match is found we create a new object and spread the properties of the i from state
      // then we update the quantity with Math.min (added quantity or maxquantity from products)
      // quantity, if the product we are finding exists will be the lowest of the two values (added quantity or maxquantity from products)
      // if products is null or undefined the fallback is the actual i.quantity from the item already in the list.
      // set state function is saying return me a new array the same size as the previous (map) but for all the items that match this id create a new object for them.
    } else {
      set((state) => ({ items: [...state.items, item] }));
      // if no match in existingItem just add the item to the current state of items.
    }
  },

  removeItem: (id: number) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  // updates the state by passing in a id and filtering the items array of all the items that dont match that id.

  incrementItem: (id: number) =>
    // incrementItem takes in a id as a number
    set((state) => {
      // use set state to change the state of items list
      // here we were using {} (explicit block of code) not ({}) (implcit object)

      const product = PRODUCTS.find((p) => p.id === id);
      // first find the product by seaching our PRODUCTS data

      if (!product) return state;
      // if product is not found we just return the state

      return {
        items: state.items.map((item) =>
          item.id === id && item.quantity < product.maxQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      // returning a object becyase set expects that
      // in the object we acess the state of the items and map ofver them.
      /* our map here says return me a list the same size of this list 
        however, for the entries that match this id and have a 
        current quantity that is less than the max product quantity
        create a new object with the props of the old and update the quantity
        or just return the item. 
      */
    }),
  decrementItem: (id: number) =>
    set((state) => ({
      // decrementItem a id  of type number and implicitly returns a object with set
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
      // sets the state of our items array by mapping over the items
      // checks if any item ids match the id passed in and if the item quantitiy is above one.
      // if conditions match we return a new object with the spreaded item and updated quantity prop
      // else we return just the item
    })),
  getTotalPrice: () => {
    const { items } = get();
    // get all the items in the state

    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
    // reduce iterates through the list and returns the total value of item.price * item.quantity
    // .toFixed(2) turns this value to a string of only two deciaml places.
  },
  getItemCount: () => {
    const { items } = get();
    // get all the items in the state

    return items.reduce((count, item) => count + item.quantity, 0);
    // reduce iterates through the list and returns the total value of item.quantity
  },
}));

// Above, this ts file exports a global state that we create with zustand and call useCartStore
// the useCartStore has a type of CartState
// CartState and CartItemType are type alias for defining a expected object its props and types
