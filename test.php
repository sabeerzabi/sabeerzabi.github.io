
<?php
$a = [
    'lantern-electricals'=>[
        'core-php',
        'cms'
    ], 
    'ethans'=>[
        'wordpress',
        'application'
    ],
    'rnb'=>[
        'codeigniter',
        'cms'
    ],
    'safaogel'=>[
        'core-php',
        'cms'
    ],
    'blinkvisa'=>[
        'laravel',
        'application',
        'in-progress'
    ],
    'cab'=>[
        'core-php',
        'application'
    ],
    'ai-smart'=>[
        'core-php',
        'cms'
    ],
    'ameda-me'=>[
        'wordpress',
        'application'
    ], 
    'elitetech'=>[
        'core-php',
        'cms'
    ],
    'fly-high-kids'=>[
        'codeigniter',
        'cms'
    ],
    'syscom-international'=>[
        'core-php',
        'cms'
    ],
    'winmax'=>[
        'core-php',
        'cms'
    ],
    'digital-link'=>[
        'core-php',
        'cms'
    ],
    'one-automation'=>[
        'codeigniter',
        'cms'
    ],
    'ferro-fpf'=>[
        'codeigniter',
        'cms'
    ],
    'meed'=>[
        'codeigniter',
        'cms'
    ],
    'al-futtiam'=>[
        'javascript',
        'application',
        'in-progress'
    ],
    'italiastarbene'=>[
        'core-php',
        'application'
    ],
    'mas-media'=>[
        'codeigniter',
        'cms'
    ],
    'promid'=>[
        'core-php',
        'application'
    ],
    'smart-construct'=>[
        'codeigniter',
        'application'
    ],
    'hiperdist'=>[
        'laravel',
        'application'
    ],
    'blinkvisa-blog'=>[
        'wordpress',
        'blog'
    ],
    'flowbot'=>[
        'laravel',
        'application',
        'in-progress'
    ],
    'geochem'=>[
        'codeigniter',
        'cms'
    ],
    'chims'=>[
        'laravel',
        'application',
        'in-progress'
    ], 
];
foreach($a as $b=>$val){
?>
    <!-- portfolio item -->
    <div class="col-md-4 col-sm-6 grid-item <?=implode(" ",$val)?>">
        <a href="./images/large/<?=$b?>.jpg" class="work-image">
            <div class="portfolio-item rounded shadow-dark">
                <div class="details">
                    <span class="term">
                        <?php
                            echo ucwords(str_replace("-"," ",$val[0])).", ";

                            echo ucwords(str_replace("-"," ",($val[1]=='cms'?"cms page":$val[1])));
                        ?>
                    </span>
                    <h4 class="title"><?=ucwords(str_replace("-"," ",$b))?></h4>
                    <span class="more-button"><i class="icon-magnifier-add"></i></span>
                </div>
                <div class="thumb">
                    <img src="./images/small/<?=$b?>.png" alt="<?=ucfirst(str_replace("-"," ",$b))?>">
                    <div class="mask"></div>
                </div>
            </div>
        </a>
    </div>
<?php 
   }
?>