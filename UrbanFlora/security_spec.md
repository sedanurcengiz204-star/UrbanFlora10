# Security Specification: UrbanFlora Firebase Firestore Database

## 1. Data Invariants
- **User profiles** (`users/{userId}`):
  - A user profile must have keys matching the authenticated user's UID.
  - The username/email cannot be modified by anyone except the authenticated user themselves.
  - Users cannot tamper with administrative fields or simulate other users' profiles.
- **Plants** (`plants/{plantId}`):
  - All plants must have a valid non-empty name, scientificName, and category.
  - The `ownerId` must strictly map to the authenticated user's UID (`request.auth.uid`).
  - The `createdAt` timestamp must match `request.time`.
  - Once created, the `id`, `ownerId`, and `createdAt` cannot be modified (immutable).

## 2. The "Dirty Dozen" Vulnerability Payloads

1. **User Profile Hijacking**: Creating or updating a user profile under another user's UID.
2. **Missing Author Identity**: Creating a plant document where `ownerId` is different from the logged in user `request.auth.uid`.
3. **Spoofed Creation Timestamp**: Setting `createdAt` to a historical or future date instead of `request.time`.
4. **Plant ID Modification**: Updating the immutable fields of pre-existing plant identifications.
5. **No Size Bound for Text Fields**: Injecting a massive 1MB string into the plant's `name` or `desc` to trigger infinite storage bills.
6. **Malicious Invalid Coords**: Inserting non-existent coordinates or string-based latitudes to damage calculations.
7. **Bypassing Category Schema**: Registering completely fake categories that do not conform to any expected values.
8. **Owner ID Mutability**: Trying to transfer a scanned plant's ownership by changing the `ownerId` field during update.
9. **Spamming Map Coordinates**: Setting extremely large numeric coordinate values far outside terrestrial limits.
10. **Unauthorized Deletion**: Removing plants identified by other community members.
11. **Anonymously Writing Records**: Submitting new records when not properly authenticated.
12. **Bypassing Verification Status**: Direct client write attempting to set a fake verified uploader level.

## 3. Recommended firestore.rules
The rules will enforce validations across these schemas directly.
