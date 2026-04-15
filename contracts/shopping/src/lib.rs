#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, String, Symbol, Vec, Address};

// Data structure untuk shopping items
#[contracttype]
#[derive(Clone, Debug)]
pub struct ShoppingItem {
    id: u64,
    name: String,
    category: String,  // groceries, gadgets, clothes, etc
    price: u64,        // dalam cents
    quantity: u64,
    purchased: bool,
    timestamp: u64,
}

// Data structure untuk rewards
#[contracttype]
#[derive(Clone, Debug)]
pub struct Reward {
    user: Address,
    points: u64,
    nfts_minted: u64,
    timestamp: u64,
}

// Data structure untuk NFT
#[contracttype]
#[derive(Clone, Debug)]
pub struct NFTReward {
    id: u64,
    user: Address,
    points_used: u64,
    minted_at: u64,
    name: String,
}

// Storage keys
const SHOPPING_DATA: Symbol = symbol_short!("SHOP_DATA");
const NEXT_ID: Symbol = symbol_short!("NEXT_ID");
const REWARD_DATA: Symbol = symbol_short!("REWARD");
const NFT_DATA: Symbol = symbol_short!("NFT_DATA");
const NEXT_NFT_ID: Symbol = symbol_short!("NEXT_NFT");
const LEADERBOARD: Symbol = symbol_short!("LEADER");

#[contract]
pub struct ShoppingContract;

#[contractimpl]
impl ShoppingContract {
    // Ambil semua shopping items
    pub fn get_items(env: Env) -> Vec<ShoppingItem> {
        return env.storage().instance().get(&SHOPPING_DATA).unwrap_or(Vec::new(&env));
    }

    // Get total spending
    pub fn get_total_spending(env: Env) -> u64 {
        let items: Vec<ShoppingItem> = env.storage().instance().get(&SHOPPING_DATA).unwrap_or(Vec::new(&env));
        let mut total: u64 = 0;
        
        for i in 0..items.len() {
            let item = items.get(i).unwrap();
            total += item.price * item.quantity;
        }
        
        return total;
    }

    // Buat shopping item baru
    pub fn create_item(
        env: Env,
        name: String,
        category: String,
        price: u64,
        quantity: u64,
    ) -> String {
        // Ambil current items
        let mut items: Vec<ShoppingItem> = env.storage().instance().get(&SHOPPING_DATA).unwrap_or(Vec::new(&env));
        
        // Get next ID
        let mut next_id: u64 = env.storage().instance().get(&NEXT_ID).unwrap_or(1u64);
        
        // Buat item baru
        let item = ShoppingItem {
            id: next_id,
            name: name,
            category: category,
            price: price,
            quantity: quantity,
            purchased: false,
            timestamp: env.ledger().timestamp(),
        };
        
        // Tambah item ke list
        items.push_back(item);
        
        // Update storage
        env.storage().instance().set(&SHOPPING_DATA, &items);
        env.storage().instance().set(&NEXT_ID, &(next_id + 1));
        
        return String::from_str(&env, "Item berhasil ditambahkan");
    }

    // Mark item sebagai purchased
    pub fn mark_purchased(env: Env, id: u64) -> String {
        let mut items: Vec<ShoppingItem> = env.storage().instance().get(&SHOPPING_DATA).unwrap_or(Vec::new(&env));
        
        for i in 0..items.len() {
            let mut item = items.get(i).unwrap();
            if item.id == id {
                item.purchased = true;
                items.set(i, item);
                env.storage().instance().set(&SHOPPING_DATA, &items);
                return String::from_str(&env, "Item marked as purchased");
            }
        }
        
        return String::from_str(&env, "Item tidak ditemukan");
    }

    // Hapus item
    pub fn delete_item(env: Env, id: u64) -> String {
        let mut items: Vec<ShoppingItem> = env.storage().instance().get(&SHOPPING_DATA).unwrap_or(Vec::new(&env));
        
        for i in 0..items.len() {
            if items.get(i).unwrap().id == id {
                items.remove(i);
                env.storage().instance().set(&SHOPPING_DATA, &items);
                return String::from_str(&env, "Item berhasil dihapus");
            }
        }
        
        return String::from_str(&env, "Item tidak ditemukan");
    }

    // Clear semua items (reset for new shopping session)
    pub fn clear_all(env: Env) -> String {
        let empty_items: Vec<ShoppingItem> = Vec::new(&env);
        env.storage().instance().set(&SHOPPING_DATA, &empty_items);
        return String::from_str(&env, "Semua item telah dihapus");
    }

    // ============ REWARD SYSTEM ============
    
    // Add reward points ketika user add item
    pub fn add_reward_points(env: Env, user: Address, points: u64) -> String {
        let mut rewards: Vec<Reward> = env.storage().instance().get(&REWARD_DATA).unwrap_or(Vec::new(&env));
        
        // Check if user already has rewards
        let mut user_found = false;
        for i in 0..rewards.len() {
            let mut reward = rewards.get(i).unwrap();
            if reward.user == user {
                reward.points += points;
                rewards.set(i, reward);
                user_found = true;
                break;
            }
        }
        
        // If user not found, create new reward
        if !user_found {
            let reward = Reward {
                user: user,
                points: points,
                nfts_minted: 0,
                timestamp: env.ledger().timestamp(),
            };
            rewards.push_back(reward);
        }
        
        env.storage().instance().set(&REWARD_DATA, &rewards);
        return String::from_str(&env, "Reward points ditambahkan!");
    }

    // Get user reward points
    pub fn get_user_rewards(env: Env, user: Address) -> u64 {
        let rewards: Vec<Reward> = env.storage().instance().get(&REWARD_DATA).unwrap_or(Vec::new(&env));
        
        for i in 0..rewards.len() {
            let reward = rewards.get(i).unwrap();
            if reward.user == user {
                return reward.points;
            }
        }
        
        return 0;
    }

    // Convert points to NFT (threshold: 10 points = 1 NFT)
    pub fn mint_nft_reward(env: Env, user: Address) -> String {
        let mut rewards: Vec<Reward> = env.storage().instance().get(&REWARD_DATA).unwrap_or(Vec::new(&env));
        let mut nfts: Vec<NFTReward> = env.storage().instance().get(&NFT_DATA).unwrap_or(Vec::new(&env));
        let mut next_nft_id: u64 = env.storage().instance().get(&NEXT_NFT_ID).unwrap_or(1);
        
        // Check user points
        let mut user_index = None;
        for i in 0..rewards.len() {
            let reward = rewards.get(i).unwrap();
            if reward.user == user {
                user_index = Some(i);
                break;
            }
        }
        
        match user_index {
            Some(idx) => {
                let mut reward = rewards.get(idx).unwrap();
                
                // Need at least 10 points for 1 NFT
                if reward.points >= 10 {
                    let nft = NFTReward {
                        id: next_nft_id,
                        user: user,
                        points_used: 10,
                        minted_at: env.ledger().timestamp(),
                        name: String::from_str(&env, "Receipt Vault NFT"),
                    };
                    
                    nfts.push_back(nft);
                    reward.points -= 10;
                    reward.nfts_minted += 1;
                    rewards.set(idx, reward);
                    
                    env.storage().instance().set(&NFT_DATA, &nfts);
                    env.storage().instance().set(&REWARD_DATA, &rewards);
                    env.storage().instance().set(&NEXT_NFT_ID, &(next_nft_id + 1));
                    
                    return String::from_str(&env, "NFT berhasil di-mint!");
                } else {
                    return String::from_str(&env, "Points tidak cukup (minimum 10)");
                }
            }
            None => {
                return String::from_str(&env, "User tidak memiliki reward");
            }
        }
    }

    // Get all NFTs untuk user
    pub fn get_user_nfts(env: Env, user: Address) -> Vec<NFTReward> {
        let nfts: Vec<NFTReward> = env.storage().instance().get(&NFT_DATA).unwrap_or(Vec::new(&env));
        let mut user_nfts = Vec::new(&env);
        
        for i in 0..nfts.len() {
            let nft = nfts.get(i).unwrap();
            if nft.user == user {
                user_nfts.push_back(nft);
            }
        }
        
        return user_nfts;
    }

    // Get leaderboard (top 10 users by points)
    pub fn get_leaderboard(env: Env) -> Vec<Reward> {
        let rewards: Vec<Reward> = env.storage().instance().get(&REWARD_DATA).unwrap_or(Vec::new(&env));
        
        // Simple return (in production, would sort by points)
        return rewards;
    }

    // Get all NFTs (global leaderboard)
    pub fn get_all_nfts(env: Env) -> Vec<NFTReward> {
        return env.storage().instance().get(&NFT_DATA).unwrap_or(Vec::new(&env));
    }
}

mod test;
