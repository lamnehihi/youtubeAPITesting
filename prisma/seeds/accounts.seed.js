require('dotenv').config();

module.exports.accounts = [{
        id: '000',
        name: 'admin',
        email: 'vschool2021vn@gmail.com',
        password: process.env.COMMONPASSWORD,
        age: 0,
        address: 'DN',
        status: 'ACTIVE',
        accRole: 'SUPERADMIN'

    },
    {
        id: '00002',
        name: 'Trường Mầm non Bạch Yến - Sơn Trà',
        email: 'bachyen@gmail.com',
        password: process.env.COMMONPASSWORD,
        age: 0,
        address: '35 Tô Hiến Thành, Phước Mỹ, Sơn Trà',
        status: 'ACTIVE',
        accRole: 'SCHOOL'

    }, {
        id: '00001',
        name: 'Nguyễn Văn Lâm',
        email: 'lam@gmail.com',
        password: process.env.COMMONPASSWORD,
        age: 30,
        address: 'Lý Văn Phức, Đà Nẵng',
        status: 'ACTIVE',
        accRole: 'PARENT'

    }
]