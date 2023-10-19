# DOCUMENTATION

## Usage Guide

- **URL**: [https://izaia.dev/bb/index](https://izaia.dev/bb/index)
- **Admin account credentials**: 
  - **Username**: admin 
  - **Password**: admin

## Table of Contents:
1. [Accessing the Website as a Guest](#accessing-the-website-as-a-guest)
   - [Viewing the Catalog](#viewing-the-catalog)
   - [Signing In](#signing-in)
2. [Accessing the Website as a User](#accessing-the-website-as-a-user)
   - [Viewing the Catalog](#viewing-the-catalog-1)
   - [Reviewing Book Requests](#reviewing-book-requests)
   - [Requesting a Book](#requesting-a-book)
   - [Signing Out](#signing-out)
3. [Technical Documentation](#technical-documentation)
4. [Software and Resources Used](#software-and-resources-used)

---

### Accessing the Website as a Guest

As a guest, you have the option to [View the Catalog](#viewing-the-catalog) or [Sign In](#signing-in).

#### Viewing the Catalog:
Browse the book catalog by sorting the database based on various categories or by using search criteria. (Note: Sorting may take a few seconds after clicking a button.)

#### Signing In:
Log in using your existing credentials or register for a new account. Admins can access using the admin-specific credentials mentioned above.

---

### Accessing the Website as a User

After signing in, you can access the following functionalities:

#### Viewing the Catalog:
Sort and search for books in the database. For admins, there's an option to unlist books which then moves to the pending book requests list. Such an unlist action is not available for regular users.

**Admin Specific**:
#### Reviewing Book Requests:
Admins hold the authority to either accept or decline book requests. Approved requests are integrated into the catalog, while declined ones are purged from the pending list. Regular users, however, can view and terminate their own requests.

#### Requesting a Book:
Both users and admins can forward requests to add new books to the catalog. These requests are then queued in the pending book requests list. Admins have the privilege to review, approve, or decline these requests. Users can also view and cancel their own requests.

#### Signing Out:
Click "Sign out" in the top-right corner to return to the front page.

---

### Technical Documentation

Access the website at [https://izaia.dev/bb/index](https://izaia.dev/bb/index).

The website is hosted on an Apache web server with a MySQL database. If running on another server, configure the project to use a different MySQL database by modifying the `config.php` file. All code is included in the project submission. 

The provided code requires hosting on a server with a MySQL database in order to function properly. To try out the functionality of our project, please use the link provided above.

---

### Software and Resources Used

- HTML, CSS, JavaScript, PHP, SQL, MySQL
- JavaScript libraries: [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/)
- [Siteground](https://www.siteground.com/) for hosting.
