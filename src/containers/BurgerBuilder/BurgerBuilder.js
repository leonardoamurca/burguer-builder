import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.2,
  meat: 1.9,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceRemove = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemove;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const { ingredients, totalPrice, purchaseable } = this.state;
    const { addIngredientHandler, removeIngredientHandler } = this;
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          currentPrice={totalPrice}
          disabled={disabledInfo}
          purchaseable={purchaseable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
