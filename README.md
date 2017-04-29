# Lose weight...stop caring membership cards in your wallet

To add new Cards : 

* Add an svg of the brand logo to ~/src/assets/card-logos/
    * Make sure you follow the existing naming convention. 
    
    ```
    best-buy.svg
    ```
* Add the card details to the cards.json file ~/src/assets/data/cards.json

    * Make sure logoFileName matches the name in step 1

    ``` JSON
    {
            "name": "Best Buy",
            "logoFileName": "best-buy",
            "background": "#005186"
    }
    ```