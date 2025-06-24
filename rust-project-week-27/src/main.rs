// fn main() {
//     let str = String::from("Lokesh");
//     // Borrowing using & -> &str, &String
//     println!("{}", get_length(&str));
//     println!("{}", str);
// }

// fn get_length(str: &String) -> usize {
//     str.len()
// }

// fn main() {
//     // immutable reference
//     let str = String::from("Lokesh");
//     let str2 = &str;
//     let str3 = &str2;
//     let str4 = &str;

//     println!("{}, {}, {}, {}", str, str2, str3, str4);
// }

fn main() {
    let mut str = String::from("Lokesh");
    let str2 = &mut str;
    str2.push_str(" Kaushik");
    // -------- we are not using str2 after this so it will not through error
    let str3 = &str;

    println!("{}", str);
    println!("{}", str3);
}