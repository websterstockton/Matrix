using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Matrix.Models;
using Microsoft.EntityFrameworkCore;

namespace Matrix.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.userName == userName);

            return (user == null || !PasswordHashVerified(password, user.PasswordHash, user.PasswordSalt)) ? null : user;
        }

        private bool PasswordHashVerified(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            // Hash password and compare with PasswordHash stored in database
            var hash = new HMACSHA512(passwordSalt);
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            bool verified = true;
            if (computedHash.Length != passwordHash.Length)
            {
                verified = false;
            }
            else if (computedHash.Length == passwordHash.Length)
            {
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    { verified = false;
                        break;
                    }
                    
                    else
                    { verified = true; }
                }
            }
            return verified;
        }

        public async Task<User> Register(string userName, string password)
        {
            // Hash the password using SHA512 with random key (salt)
            var hash = new HMACSHA512();
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            var newUser = new User { userName = userName };
            newUser.PasswordHash = computedHash;
            newUser.PasswordSalt = hash.Key;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public bool CheckDuplicates(string userName)
        {
            if (_context.Users.Where(u => u.userName == userName).SingleOrDefault() == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}