fn main() {
    println!("{}", get_first_name(String::from("Lokesh Kaushik")));
    let name = String::from("Lokesh Kaushik");
    for part in name.split(' ') {
        println!("{}", part);
    }
}

fn get_first_name(name: String) -> String {
    let mut first_name: String = String::from("");
    for c in name.chars() {
        println!("{}", c);
        if c == ' ' {
            break;
        } else {
            first_name.push(c);
        }
    }

    return first_name;
}
