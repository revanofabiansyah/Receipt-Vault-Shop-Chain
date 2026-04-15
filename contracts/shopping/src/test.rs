#[cfg(test)]
mod tests {
    use crate::{ShoppingContract, ShoppingContractClient};
    use soroban_sdk::Env;

    #[test]
    fn test_create_and_get_items() {
        let env = Env::default();
        let client = ShoppingContractClient::new(&env, &env.register_contract(None, ShoppingContract));

        // Create an item
        let result = client.create_item(
            &String::from_str(&env, "Apples"),
            &String::from_str(&env, "groceries"),
            &5000,
            &2,
        );

        assert_eq!(result, String::from_str(&env, "Item berhasil ditambahkan"));

        // Get all items
        let items = client.get_items();
        assert_eq!(items.len(), 1);
    }
}
