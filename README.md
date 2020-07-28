PHP:
holds all API files.
characters:
holds all files that relate to the characters table in the database (this is where all pokemon and default values are stored)
user:
holds all files that relate to the user table in the database (this is where user's owned pokemon values are stored)

Images:
leave images where they are, the paths are stored in the database.


Implementation:
1. Run the setup.sql file in php myadmin 
2. Create a username and password for your pokemon database, grant all privileges 
3. go into /php/database.php and modify the database and host variables to match yours.
4. run 'php/character/importCharacter.php' in the browser to load the character table
5. HAVE FUN!!

note: importCharacters API call must be done before utilizing any of the other API calls.