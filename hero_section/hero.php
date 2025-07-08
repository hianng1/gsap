<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CSA Vietnam - Giải Pháp Marketing & Công Nghệ Hàng Đầu</title>
        <meta name="description" content="CSA Vietnam - Đối tác tin cậy trong chuyển đổi số và phát triển thương hiệu doanh nghiệp. Với 7 năm kinh nghiệm từ VietProteam." />
        
        <!-- Preload critical resources -->
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" as="script" />
        <link rel="preload" href="nang_cao_chat_luong.jpeg" as="image" />
        
        <!-- GSAP Animation Libraries -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/TextPlugin.min.js"></script>
        
        <!-- SplitType for text animations -->
        <script src="https://unpkg.com/split-type@0.3.4/dist/index.umd.js"></script>
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
        
        <!-- Font Awesome -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        
        <!-- Custom Styles -->
        <link rel="stylesheet" href="hero-animations.css" />
        
        <!-- Custom Scripts -->
        <script src="hero-animations.js" defer></script>
    </head>
    <body>
        <?php
            // Configuration and data setup
            $config = [
                'site_name' => 'CSA Vietnam',
                'current_year' => date('Y'),
                'experience_years' => 7,
                'founded_year' => 2018
            ];

            // Hero section content
            $heroContent = [
                'title' => "Giải Pháp Marketing & Công Nghệ Hàng Đầu Việt Nam",
                'subtitle' => "Chuyên nghiệp • Sáng tạo • Hiệu quả",
                'description' => "CSA Vietnam là đối tác tin cậy trong hành trình chuyển đổi số và phát triển thương hiệu cho doanh nghiệp. Với {$config['experience_years']} năm kinh nghiệm từ tiền thân VietProteam ({$config['founded_year']}-{$config['current_year']}) và đội ngũ chuyên gia tài năng, chúng tôi mang đến giải pháp toàn diện từ Marketing số đến Công nghệ thông tin và Tuyển dụng nhân sự.",
                'cta_primary' => [
                    'text' => 'Khám phá dịch vụ',
                    'url' => '#services',
                    'icon' => 'fas fa-rocket'
                ],
                'cta_secondary' => [
                    'text' => 'Liên hệ ngay',
                    'url' => '#contact',
                    'icon' => 'fas fa-phone'
                ]
            ];

            // Key statistics for display
            $statistics = [
                [
                    'number' => '500+',
                    'label' => 'Dự án thành công',
                    'icon' => 'fas fa-project-diagram'
                ],
                [
                    'number' => '99%',
                    'label' => 'Khách hàng hài lòng',
                    'icon' => 'fas fa-heart'
                ],
                [
                    'number' => '24/7',
                    'label' => 'Hỗ trợ khách hàng',
                    'icon' => 'fas fa-headset'
                ]
            ];
        ?>

        <!-- Hero Section -->
        <section id="hero" class="hero-section" data-parallax="0.5">
            <!-- Background Elements -->
            <div class="hero-background">
                <div class="hero-background-image" data-parallax="0.2">
                    <div class="background-overlay"></div>
                </div>
                <div class="hero-background-overlay"></div>
            </div>

            <!-- Animated Background Particles -->
            <div class="particles-container" id="particles-hero"></div>

            <!-- Main Content -->
            <div class="container">
                <div class="hero-content" data-hero>
                    <!-- Main Title -->
                    <h1 class="hero-title split-text" data-hero-title>
                        <?php echo htmlspecialchars($heroContent['title']); ?>
                    </h1>

                    <!-- Subtitle -->
                    <h2 class="hero-subtitle" data-hero-subtitle>
                        <?php echo htmlspecialchars($heroContent['subtitle']); ?>
                    </h2>

                    <!-- Description -->
                    <div class="intro-text" data-hero-text>
                        <p><?php echo htmlspecialchars($heroContent['description']); ?></p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="hero-buttons" data-hero-buttons>
                        <a
                            href="<?php echo htmlspecialchars($heroContent['cta_primary']['url']); ?>"
                            class="btn btn-primary"
                            data-hover="slide"
                            aria-label="<?php echo htmlspecialchars($heroContent['cta_primary']['text']); ?>"
                        >
                            <span><?php echo htmlspecialchars($heroContent['cta_primary']['text']); ?></span>
                            <i class="<?php echo htmlspecialchars($heroContent['cta_primary']['icon']); ?>"></i>
                        </a>
                        <a
                            href="<?php echo htmlspecialchars($heroContent['cta_secondary']['url']); ?>"
                            class="btn btn-outline"
                            data-hover="slide"
                            aria-label="<?php echo htmlspecialchars($heroContent['cta_secondary']['text']); ?>"
                        >
                            <span><?php echo htmlspecialchars($heroContent['cta_secondary']['text']); ?></span>
                            <i class="<?php echo htmlspecialchars($heroContent['cta_secondary']['icon']); ?>"></i>
                        </a>
                    </div>

                    <!-- Statistics -->
                    <div class="hero-stats" data-hero-stats>
                        <?php foreach ($statistics as $stat): ?>
                        <div class="stat-item">
                            <div class="stat-icon">
                                <i class="<?php echo htmlspecialchars($stat['icon']); ?>"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number"><?php echo htmlspecialchars($stat['number']); ?></div>
                                <div class="stat-label"><?php echo htmlspecialchars($stat['label']); ?></div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Decorative Elements -->
                <div class="hero-decoration">
                    <div class="hero-shape shape-1" data-shape="1"></div>
                    <div class="hero-shape shape-2" data-shape="2"></div>
                    <div class="hero-shape shape-3" data-shape="3"></div>
                </div>

                <!-- Scroll Indicator -->
                <div class="scroll-indicator" aria-label="Scroll down">
                    <div class="scroll-dot"></div>
                </div>
            </div>
        </section>

        <!-- Additional Content Sections -->
        <section id="services" class="content-section">
            <div class="container">
                <h2>Dịch vụ của chúng tôi</h2>
                <p>Nội dung sẽ được thêm vào đây...</p>
            </div>
        </section>

        <section id="contact" class="content-section">
            <div class="container">
                <h2>Liên hệ với chúng tôi</h2>
                <p>Thông tin liên hệ sẽ được thêm vào đây...</p>
            </div>
        </section>

        <!-- Loading Screen -->
        <div class="loading-screen" id="loadingScreen">
            <div class="loading-content">
                <div class="loading-logo">
                    <span><?php echo htmlspecialchars($config['site_name']); ?></span>
                </div>
                <div class="loading-spinner"></div>
            </div>
        </div>
    </body>
</html>